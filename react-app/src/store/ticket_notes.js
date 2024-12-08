// constants
const CREATE = "ticket_notes/CREATE";
const READ_ALL = "ticket_notes/READ_ALL";
const READ_ONE = "ticket_notes/READ_ONE";
const DELETE = "ticket_notes/DELETE";
const RESET = "ticket_notes/RESET";

// action creators
const create_tnote = (payload) => ({ type: CREATE, payload });
const read_tnotes = (payload) => ({ type: READ_ALL, payload });
const read_tnote = (payload) => ({ type: READ_ONE, payload });
const delete_tnote = (payload) => ({ type: DELETE, payload });
export const reset_tnotess = () => ({ type: RESET })

// thunks
export const createTicketNote = (tnote, id) => async dispatch => {
  console.log(tnote, id)
  const res = await fetch(`/api/tickets/${id}/notes`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(tnote)
  });
  const data = await res.json();

  if (res.ok) {
    dispatch(create_tnote(data));
    return data.id;
  }
  return { errors: data };
}
export const getAllTicketNotes = id => async dispatch => {
  const res = await fetch(`/api/tickets/${id}/notes`);
  const data = await res.json();

  if (res.ok) {
    dispatch(read_tnotes(data));
    return data;
  }
  return data;
}
export const getOneTicketNote = id => async dispatch => {
  const res = await fetch(`/api/ticket-notes/${id}`);
  const data = await res.json();

  if (res.ok) {
    dispatch(read_tnote(data));
  }
  return data;
}
export const deleteTicketNote = (id) => async dispatch => {
  const res = await fetch(`/api/ticket-notes/${id}`, { method: 'DELETE' });
  const data = await res.json();

  if (res.ok) dispatch(delete_tnote(id));
  return data;
}


//reducer
const initialState = {};

export default function reducer(state = initialState, action) {
  const newState = { ...state };

  switch (action.type) {
    case CREATE:
      newState[action.payload.id] = action.payload
      return newState;
    case READ_ALL:
      action.payload.forEach(tnote => {
        newState[tnote.id] = tnote;
      })
      return newState;
    case READ_ONE:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE:
      delete newState[action.payload]
      return newState;
    case RESET:
      return {};
    default:
      return state;
  }
}