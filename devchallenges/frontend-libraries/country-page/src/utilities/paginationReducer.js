import initialPagination from "./initialPagination";

function paginationReducer(state, action) {
  switch (action.type) {
    case "NEXT_PAGE":
      return {
        ...state,
        start: state.start + state.pageSize,
        end: state.end + state.pageSize,
        currentPage: state.currentPage + 1,
      };
    case "PREV_PAGE":
      return {
        ...state,
        start: Math.max(0, state.start - state.pageSize),
        end: Math.max(state.pageSize, state.end - state.pageSize),
        currentPage: Math.max(1, state.currentPage - 1),
      };
    case "RESET_PAGE":
      return {
        ...initialPagination,
        pageSize: state.pageSize, // Keep the same page size
      };
    default:
      return state;
  }
}

export default paginationReducer;
