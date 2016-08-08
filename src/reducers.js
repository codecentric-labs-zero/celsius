const initialState = {
  termin: '',
  temperatura: '',
  isLoaded: false
};

export default function temperature(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOAD':
      return Object.assign({}, state, {
        termin: action.data.termin,
        temperatura: action.data.temperatura,
        isLoaded: true
      })
      break;
    default:
      return state;
  }
}
