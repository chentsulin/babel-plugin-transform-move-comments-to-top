export default function ({ types: t }) {
  return {
    visitor: {
      Program(path, state) {
        let done = false;
        let comments = [];
        path.traverse({
          enter(path) {
            if (path.node.trailingComments) {
              comments = comments.concat(path.node.trailingComments);
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
