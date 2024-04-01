import styled from '@emotion/styled';

export default styled.div`
  .DraftEditor-editorContainer,
  .DraftEditor-root,
  .public-DraftEditor-content {
    height: inherit;
    text-align: initial;
  }

  .public-DraftEditor-content[contenteditable='true'] {
    -webkit-user-modify: read-write-plaintext-only;
  }

  .DraftEditor-editorContainer {
    position: relative;
    z-index: 1;
  }

  .public-DraftEditor-block {
    position: relative;
  }

  .DraftEditor-alignLeft .public-DraftStyleDefault-block {
    text-align: left;
  }

  .DraftEditor-alignLeft .public-DraftEditorPlaceholder-root {
    left: 0;
    text-align: left;
  }

  .DraftEditor-alignCenter .public-DraftStyleDefault-block {
    text-align: center;
  }

  .DraftEditor-alignCenter .public-DraftEditorPlaceholder-root {
    margin: 0 auto;
    text-align: center;
    width: 100%;
  }

  .DraftEditor-alignRight .public-DraftStyleDefault-block {
    text-align: right;
  }

  .DraftEditor-alignRight .public-DraftEditorPlaceholder-root {
    right: 0;
    text-align: right;
  }

  .public-DraftEditorPlaceholder-root {
    color: #9197a3;
    position: absolute;
    z-index: 1;
  }

  .public-DraftEditorPlaceholder-hasFocus {
    color: #bdc1c9;
  }

  .DraftEditorPlaceholder-hidden {
    display: none;
  }

  .public-DraftStyleDefault-block {
    position: relative;
    white-space: pre-wrap;
  }

  .public-DraftStyleDefault-ltr {
    direction: ltr;
    text-align: inherit;
  }

  .public-DraftStyleDefault-rtl {
    direction: rtl;
    text-align: right;
  }

  .public-DraftStyleDefault-listLTR {
    direction: ltr;
  }

  .public-DraftStyleDefault-listRTL {
    direction: rtl;
  }

  .public-DraftStyleDefault-ol,
  .public-DraftStyleDefault-ul {
    margin: 0;
    padding: 0;
  }

  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR {
    margin-left: 2.5rem;
  }

  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL {
    margin-right: 2.5rem;
  }

  .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR {
    margin-left: 4rem;
  }

  .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL {
    margin-right: 4rem;
  }

  .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR {
    margin-left: 5.5rem;
  }

  .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL {
    margin-right: 5.5rem;
  }

  .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR {
    margin-left: 7rem;
  }

  .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL {
    margin-right: 7rem;
  }

  .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR {
    margin-left: 8.5rem;
  }

  .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL {
    margin-right: 8.5rem;
  }

  .public-DraftStyleDefault-unorderedListItem {
    list-style-type: square;
    position: relative;
  }

  .public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0 {
    list-style-type: disc;
  }

  .public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1 {
    list-style-type: circle;
  }

  .public-DraftStyleDefault-orderedListItem {
    list-style-type: none;
    position: relative;
  }

  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before {
    left: -36px;
    position: absolute;
    text-align: right;
    font-family: inherit;
    font-size: inherit;
    width: 30px;
  }

  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before {
    position: absolute;
    right: -36px;
    text-align: left;
    width: 30px;
  }

  .public-DraftStyleDefault-orderedListItem:before {
    content: counter(ol0) '. ';
    counter-increment: ol0;
  }

  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before {
    content: counter(ol1, lower-alpha) ') ';
    counter-increment: ol1;
  }

  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before {
    content: counter(ol2, lower-roman) '. ';
    counter-increment: ol2;
  }

  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before {
    content: counter(ol3, upper-alpha) '. ';
    counter-increment: ol3;
  }

  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before {
    content: counter(ol4) '. ';
    counter-increment: ol4;
  }

  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset {
    counter-reset: ol0;
  }

  .public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset {
    counter-reset: ol1;
  }

  .public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset {
    counter-reset: ol2;
  }

  .public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset {
    counter-reset: ol3;
  }

  .public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset {
    counter-reset: ol4;
  }
`;
