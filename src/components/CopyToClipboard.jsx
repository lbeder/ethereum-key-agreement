import React from 'react';

import { Button } from 'react-bootstrap';
import { CopyToClipboard as CopyClipboard } from 'react-copy-to-clipboard';
import { Copy } from 'react-feather';
import ReactTooltip from 'react-tooltip';

const CopyToClipboard = ({ text }) => {
  return (
    <>
      <CopyClipboard text={text}>
        <Button
          variant="secondary"
          data-tip="Copy to clipboard"
          onClick={e => e.preventDefault()}><Copy size={16} />
        </Button>
      </CopyClipboard>

      <ReactTooltip />
    </>
  );
}

export default CopyToClipboard;
