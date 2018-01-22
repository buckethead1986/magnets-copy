export default function reducer(
  state = { zIndex: 0, words: [], allWords: {} },
  action
) {
  switch (action.type) {
    case "INCREASE_Z":
      return Object.assign({}, state, { zIndex: state.zIndex + 1 });

    case "ADD_WORD":
      let poem = [];
      for (var word in action.payload) {
        if (
          action.payload[word].left > window.innerWidth / 2 - 300 &&
          action.payload[word].left < window.innerWidth / 2 + 300 &&
          action.payload[word].top > 200
        ) {
          poem.push(action.payload[word]);
        }
      }
      return Object.assign({}, state, { words: poem });

    case "ADD_ALL_WORDS":
      return Object.assign({}, state, { allWords: action.payload });

    case "ADD_WIDTH_AND_HEIGHT":
      //adds the div height and width in px to the store for spacing when rendering draggable boxes
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

    case "REMOVE_POEM":
      return Object.assign({}, state, { words: [] });
    default:
      return state;
  }
}
