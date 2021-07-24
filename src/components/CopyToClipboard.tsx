import { MouseEvent } from 'react';
import { Button } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Copy } from 'react-feather';
import ReactTooltip from 'react-tooltip';

interface IProps {
  text: string;
}

const CopyClipboard = ({ text }: IProps) => {
  const preventDefault = (e: MouseEvent) => e.preventDefault();

  return (
    <>
      <CopyToClipboard text={text}>
        <Button variant="secondary" data-tip="Copy to clipboard" onClick={preventDefault}>
          <Copy size={16} />
        </Button>
      </CopyToClipboard>

      <ReactTooltip />
    </>
  );
};

export default CopyClipboard;
