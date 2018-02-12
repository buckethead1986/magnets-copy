export default function reducer(
  state = {
    zIndex: 0,
    words: [],
    allWords: {},
    image: "",
    shownUser: [],
    wordsList: 1,
    wordsGroup: {}
  },
  action
) {
  switch (action.type) {
    case "INCREASE_Z":
      return Object.assign({}, state, { zIndex: state.zIndex + 1 });

    case "ADD_WORD":
      let poem = [];
      for (var word in action.payload) {
        if (
          action.payload[word].left > window.innerWidth / 2 - 250 &&
          action.payload[word].left < window.innerWidth / 2 + 250 &&
          action.payload[word].top > 200
        ) {
          poem.push(action.payload[word]);
        }
      }
      return Object.assign({}, state, { words: poem });

    case "ADD_ALL_WORDS":
      return Object.assign({}, state, { allWords: action.payload });

    //adds the div height and width in px to the store for spacing when rendering draggable boxes
    case "ADD_WIDTH_AND_HEIGHT":
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
    case "CHANGE_IMAGE":
      return Object.assign({}, state, { image: action.payload });
    case "CHANGE_SHOWN_USER":
      return Object.assign({}, state, { shownUser: action.payload });
    case "CHANGE_WORDS_GROUP":
      return Object.assign({}, state, { wordsGroup: action.payload });
    case "CHANGE_WORDS_LIST":
      return Object.assign({}, state, { wordsList: action.payload });
    default:
      return state;
  }
}
