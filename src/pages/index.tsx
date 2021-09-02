import { useEffect, useState } from "react";
import { useQuery, useRefetch } from "../gqty";

export default function Hello() {
  const refetch = useRefetch();
  const { hello, getCurrentUser } = useQuery();

  return (
    <div>
      <p>{hello || "Loading..."}</p>
      {/* removing these lines causes the data to never refetch at all */}
      <p>{getCurrentUser.id}</p>
      <p>{getCurrentUser.name}</p>
      {/*  */}
      <div>
        Customers:
        {getCurrentUser.customers.map((item) =>
          item?.shippingAddress.map((item, index) => (
            <p key={index}>{item?.addressOne}</p>
          ))
        )}
      </div>
      <button
        onClick={() => {
          refetch(getCurrentUser);
        }}
      >
        Refetch
      </button>
    </div>
  );
}
