
import { undoRedoReducer } from './undoRedoReducer';
import { elementReducer } from './elementReducer';

const rootReducer = undoRedoReducer(elementReducer);

export default rootReducer;

