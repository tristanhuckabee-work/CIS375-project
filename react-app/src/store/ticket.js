// constants
const CREATE = "tickets/CREATE";
const READ_ALL = "tickets/READ_ALL";
const READ_ONE = "tickets/READ_ONE";
const UPDATE = "tickets/UPDATE";
const DELETE = "tickets/DELETE";
const RESET = "tickets/RESET";

// action creators
const create_ticket = (payload) => ({ type: CREATE, payload });
const read_tickets = (payload) => ({ type: READ_ALL, payload });
const read_ticket = (payload) => ({ type: READ_ONE, payload });
// const update_ticket = (payload) => ({ type: UPDATE, payload });
export const reset_tickets = () => ({type: RESET})

// thunks
export const createTicket = ticket => async dispatch => {
  const res = await fetch('/api/tickets/', {
    method: 'POST',
    body: ticket
  });
  const data = await res.json();

  if (res.ok) {
    dispatch(create_ticket(data));
    return data.id;
  }
  return {errors: data};
}
export const getAllTickets = id => async dispatch => {
  const res = await fetch(`/api/projects/${id}/tickets`);
  const data = await res.json();

  if (res.ok) {
    dispatch(read_tickets(data));
    return data;
  }
  return data;
}
export const getOneTicket = id => async dispatch => {
  const res = await fetch(`/api/tickets/${id}`);
  const data = await res.json();

  if (res.ok) {
    dispatch(read_ticket(data));
  }
  console.log(data);
  return data;
}
export const updateTicket = ticket => async dispatch => {}
export const deleteTicket = id => async dispatch => {}


//reducer
const initialState = {};

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  
  switch (action.type) {
    case CREATE:
      newState[action.payload.id] = action.payload
      return newState;
    case READ_ALL:
      action.payload.forEach(ticket => {
        newState[ticket.id] = ticket;
      })
      newState.byPriority = action.payload.sort((a, b) => {
        console.log(b.priority[2], a.priority[2]);
        return b.priority[2] - a.priority[2]
      })
      return newState;
    case READ_ONE:
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE:
      return newState;
    case DELETE:
      return newState;
    case RESET:
      return {};
    default:
      return state;
  }
}