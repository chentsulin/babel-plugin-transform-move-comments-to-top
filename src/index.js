import deepEqual from 'deep-equal';

function deepIncludes(arr, value) {
  return arr.some(item => {
    return deepEqual(item, value)
  });
}

export default function ({ types: t }) {
  return {
    visitor: {
      Program(path, state) {
        let done = false;
        let comments = [];
        path.traverse({
          enter(path) {
            if (path.node.leadingComments) {
              path.node.leadingComments.forEach(comment => {
                if (!deepIncludes(comments, comment)) {
                  comments = comments.concat(comment);
                }
              });
            }
            if (path.node.trailingComments) {
              path.node.trailingComments.forEach(comment => {
                if (!deepIncludes(comments, comment)) {
                  comments = comments.concat(comment);
                }
              });
            }
            t.removeComments(path.node);
          },
        });
        path.traverse({
          enter(path) {
            if (!done) {
              comments.forEach(comment => {
                path.addComment('leading', comment.value, true);
              });
              done = true;
            }
          },
        });
      },
    },
  };
}
