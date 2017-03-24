import React from 'react';
import Cancelled from './cancelled';

function titleCreator(checker, time) {
  return checker.setNowOrPast('This session has started', 'This session has finished', 'This sessions runs between ' + time);
}

export default function (props) {
  if (props.cancelled) {
    return React.createElement(Cancelled, { time: props.time });
  }

  return React.createElement(
    'span',
    { title: titleCreator(props.checker, props.time) },
    props.time
  );
};
//# sourceMappingURL=time.js.map