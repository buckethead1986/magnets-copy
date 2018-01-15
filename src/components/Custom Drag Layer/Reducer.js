export default function reducer(
  state = { zIndex: 0, words: {}, allWords: {} },
  action
) {
  switch (action.type) {
    case "INCREASE_Z":
      // console.log("Store is working", state, state.zIndex + 1);
      return Object.assign({}, state, { zIndex: state.zIndex + 1 });
    case "ADD_WORD":
      let poem = [];
      for (var word in action.payload) {
        if (action.payload[word].top > 300) {
          poem.push(action.payload[word]);
        }
      }
      return Object.assign({}, state, { words: poem });
    case "ADD_ALL_WORDS":
      console.log(action.payload);
      // debugger;
      return Object.assign({}, state, { allWords: action.payload });

    case "ADD_WIDTH_AND_HEIGHT":
      //adds the div height and width in px to the store for spacing when rendering draggable boxes
      console.log(action.payload, state);
      console.log(state.allWords);
      return {
        ...state,
        allWords: {
          ...state.allWords,
          [action.payload.id]: {
            ...state.allWords[action.payload.id],
            width: action.payload.offsetWidth,
            height: action.payload.offsetHeight
          }
        }
      };
    // const test = { ...state, allwords: { ...state.allWords, {state.allWords[action.payload.id]} } };
    // debugger;
    // return Object.assign({}, state, { allWords: action.payload });
    // case 'UPDATE_X_AND_Y_COORD':

    default:
      return state;
  }
}
