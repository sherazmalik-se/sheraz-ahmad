import React from "react";

function Status({
  unMember,
  setUnMember,
  independent,
  setIndependent,
  dispatchPagination,
}) {
  return (
    <div className="mt-9 flex flex-col gap-3">
      <p className="text-xs">Status</p>

      <div className="grid grid-cols-[auto_1fr] gap-2.5 items-center text-sm">
        <input
          type="checkbox"
          name="member"
          id="member"
          className="cursor-pointer w-6 h-6 bg-[#1B1D1F] rounded-md checked:bg-[#4E80EE] border-2 border-[#D2D5DA] checked:border-[#4E80EE] appearance-none checked:bg-[url('/resources/Done_round.svg')] bg-no-repeat bg-center"
          onChange={() => {
            setUnMember(prevUnMember => !prevUnMember);
            dispatchPagination({ type: "RESET_PAGE" });
          }}
          checked={unMember}
        />
        <label htmlFor="member" className="cursor-pointer">
          Member of the United Nations
        </label>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-2.5 items-center text-sm">
        <input
          type="checkbox"
          name="independent"
          id="independent"
          className="cursor-pointer w-6 h-6 bg-[#1B1D1F] rounded-md checked:bg-[#4E80EE] border-2 border-[#D2D5DA] checked:border-[#4E80EE] appearance-none checked:bg-[url('/resources/Done_round.svg')] bg-no-repeat bg-center"
          onChange={() => {
            setIndependent(prevIndependent => !prevIndependent);
            dispatchPagination({ type: "RESET_PAGE" });
          }}
          checked={independent}
        />
        <label htmlFor="independent" className="cursor-pointer">
          Independent
        </label>
      </div>
    </div>
  );
}

export default Status;
