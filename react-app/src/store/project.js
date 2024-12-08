// constants
const CREATE = "projects/CREATE";
const READ_ALL = "projects/READ_ALL";
const READ_USER = "projects/READ_BY_USER";
const READ_ONE = "projects/READ_ONE";
const UPDATE = "projects/UPDATE";
const DELETE = "projects/DELETE";

// action creators
const create_project = (payload) => ({ type: CREATE, payload });
const read_projects = (payload) => ({ type: READ_ALL, payload });
const read_by_user = payload => ({ type: READ_USER, payload });
const read_project = (payload) => ({ type: READ_ONE, payload });
const update_project = (payload) => ({ type: UPDATE, payload });
const delete_project = (payload) => ({ type: DELETE, payload });

// thunks
export const addUser = payload => async () => {
  const [uid, id] = payload

  const res = await fetch(`/api/projects/${id}/users/${uid}`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  
  const data = await res.json();

  return data;
}
export const createProject = project => async dispatch => {
  const res = await fetch('/api/projects/', {
    method: 'POST',
    body: project
  });

  const data = await res.json();

  if (res.ok) {
    dispatch(create_project(data));
    return data.id;
  }
  return { errors: data };
}
export const getAllProjects = () => async dispatch => {
  const res = await fetch("/api/projects");
  // const res = await fetch(`/api/users/${id}/projects`);
  const data = await res.json();

  if (res.ok) {
    dispatch(read_projects(data));
    return data;
  }
  return data;
}
export const getAllProjectsById = id => async dispatch => {
  const res = await fetch("/api/projects");
  const data = await res.json();

  if (res.ok) {
    dispatch(read_by_user({ data, id }));
    return data;
  }
  return data;
}
export const getOneProject = id => async dispatch => {
  const res = await fetch(`/api/projects/${id}`);
  const data = await res.json();

  if (res.ok) {
    dispatch(read_project(data));
    return data;
  }
  return data;
}
export const updateProject = project => async dispatch => {
  const {name, description, today, id} = project;
  const res = await fetch(`/api/projects/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({name, description, updated_at:today})
  });
  const data = await res.json();
  
  if (res.ok) dispatch(update_project(data));
  return data;
}
export const deleteProject = id => async dispatch => {
  const res = await fetch(`/api/projects/${id}`, {
    method: 'DELETE'
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(delete_project(id));
  }
  return data;
}


//reducer
const initialState = {};

export default function reducer(state = initialState, action) {
  const newState = { ...state };

  switch (action.type) {
    case CREATE:
      return newState;
    case READ_ALL:
      action.payload.projects.forEach(el => {
        newState[el.id] = el;
      })
      return newState;
    case READ_USER:
      let data = action.payload.data.projects;
      data.forEach(el => {
        let dUsers = el.users.map(user => user.id);
        if (dUsers.includes(action.payload.id)) {
          newState[el.id] = el;
        }
      })
      return newState;
    case READ_ONE:
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE:
      delete newState[action.payload]
      return newState;
    default:
      return state;
  }
}