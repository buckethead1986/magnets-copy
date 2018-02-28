export default function reducer(
  state = {
    zIndex: 0,
    words: [],
    allWords: {},
    image: "",
    shownUser: {},
    wordsList: 1,
    wordsGroup: {}
  },
  action
) {
  switch (action.type) {
    //updates global zIndex so dragged boxes overlap correctly
    case "INCREASE_Z":
      return Object.assign({}, state, { zIndex: state.zIndex + 1 });

    //adds word to store if it's within the poem creation box. I went back and forth between putting the logic here
    //vs in the component before calling store.dispatch. If one is 'better' for speed or by convention, please let me know.
    case "ADD_WORD":
      let poem = [];
      for (var word in action.payload) {
        if (
          action.payload[word].group === state.wordsList &&
          action.payload[word].left > window.innerWidth / 2 - 250 &&
          action.payload[word].left < window.innerWidth / 2 + 250 &&
          action.payload[word].top > 200
        ) {
          poem.push(action.payload[word]);
        }
      }
      return Object.assign({}, state, { words: poem });

    //adds
    case "ADD_ALL_WORDS":
      return Object.assign({}, state, { allWords: action.payload });

    //adds the div height and width in px to the store for spacing when rendering draggable boxes. Allows constant width between different length word boxes.
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

    //clears state after poem submission
    case "REMOVE_POEM":
      return Object.assign({}, state, { words: [] });

    //changes currently shown avatar image
    case "CHANGE_IMAGE":
      return Object.assign({}, state, { image: action.payload });

    //changes the shown user on the profile page
    case "CHANGE_SHOWN_USER":
      return Object.assign({}, state, { shownUser: action.payload });

    //updates store with current list of words
    case "CHANGE_WORDS_GROUP":
      return Object.assign({}, state, { wordsGroup: action.payload });

    //changes the selected word list signifier
    case "CHANGE_WORDS_LIST":
      return Object.assign({}, state, { wordsList: action.payload });
    default:
      return state;
  }
}
