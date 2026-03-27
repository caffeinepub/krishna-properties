import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type CustomerQuery = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    serviceType : Text;
    message : Text;
    timestamp : Int;
    status : Text;
  };

  module CustomerQuery {
    public func compare(a : CustomerQuery, b : CustomerQuery) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  stable var nextQueryId : Nat = 0;
  let queries = Map.empty<Nat, CustomerQuery>();

  // Public function - accessible to everyone including guests
  // No authorization check needed as per requirements
  public shared ({ caller }) func addQuery(name : Text, phone : Text, email : Text, serviceType : Text, message : Text) : async Nat {
    let queryId = nextQueryId;
    nextQueryId += 1;

    let customerQuery : CustomerQuery = {
      id = queryId;
      name;
      phone;
      email;
      serviceType;
      message;
      timestamp = Time.now();
      status = "new";
    };
    queries.add(queryId, customerQuery);
    queryId;
  };

  // Admin-only function
  public query ({ caller }) func getAllQueries() : async [CustomerQuery] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all queries");
    };
    queries.values().toArray().sort();
  };

  // Admin-only function
  public shared ({ caller }) func updateQueryStatus(queryId : Nat, newStatus : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update query status");
    };
    if (not queries.containsKey(queryId)) {
      Runtime.trap("Query does not exist");
    };
    if (not Text.equal(newStatus, "new") and not Text.equal(newStatus, "read") and not Text.equal(newStatus, "resolved")) {
      Runtime.trap("Invalid status");
    };
    let customerQuery = queries.get(queryId);
    switch (customerQuery) {
      case (null) {
        Runtime.trap("Query does not exist");
      };
      case (?customerQuery) {
        let updatedCustomerQuery : CustomerQuery = {
          id = customerQuery.id;
          name = customerQuery.name;
          phone = customerQuery.phone;
          email = customerQuery.email;
          serviceType = customerQuery.serviceType;
          message = customerQuery.message;
          timestamp = customerQuery.timestamp;
          status = newStatus;
        };
        queries.add(queryId, updatedCustomerQuery);
      };
    };
  };

  // Admin-only function
  public query ({ caller }) func getQueryCountByStatus() : async [(Text, Nat)] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view query counts");
    };
    let newCount = queries.values().toArray().filter(func(q) { Text.equal(q.status, "new") }).size();
    let readCount = queries.values().toArray().filter(func(q) { Text.equal(q.status, "read") }).size();
    let resolvedCount = queries.values().toArray().filter(func(q) { Text.equal(q.status, "resolved") }).size();

    [("new", newCount), ("read", readCount), ("resolved", resolvedCount)];
  };
};
