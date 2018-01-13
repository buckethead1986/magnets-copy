export default function reducer(state = { zIndex: 0, words: {} }, action) {
  switch (action.type) {
    case "INCREASE_Z":
      console.log("Store is working", state, state.zIndex + 1);
      return Object.assign({}, state, (state.zIndex = state.zIndex + 1));
    case "ADD_WORD":
      let poem = [];
      for (var word in action.payload) {
        if (action.payload[word].top > 300) {
          poem.push(action.payload[word]);
        }
      }
      return Object.assign({}, state, (state.words = poem));
    default:
      return state;
  }
}
