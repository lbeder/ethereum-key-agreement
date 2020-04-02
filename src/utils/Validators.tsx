import React from 'react';
import validator from 'validator';
import { fromRpcSig } from 'ethereumjs-util';

import { PrivateKey } from './PrivateKey';
import { PublicKey } from './PublicKey';

export const isPresent = (value: string) => {
  if (validator.isEmpty(value, { ignore_whitespace: true })) {
    return <div className="invalid-feedback">Can't be blank</div>;
  }
};

export const isNumber = (value: string) => {
  if (value === null || value === undefined || !validator.isNumeric(value)) {
    return <div className="invalid-feedback">Not a valid number</div>;
  }
};

export const isHex = (value: string) => {
  let hex = false;
  let tmp = value;
  if (tmp) {
    if (tmp.startsWith('0x')) {
      tmp = tmp.slice(2) || '0';
    }
    hex = validator.isHexadecimal(tmp);
  }

  if (!hex) {
    return <div className="invalid-feedback">Not a valid hexadecimal data</div>;
  }
};

export const isPrivateKey = (value: string) => {
  if (!PrivateKey.isValid(value)) {
    return <div className="invalid-feedback">Not a valid private key</div>;
  }
};

export const isPublicKey = (value: string) => {
  if (!PublicKey.isValid(value)) {
    return <div className="invalid-feedback">Not a valid public key</div>;
  }
};

export const isValidSignature = (value: string) => {
  try {
    let tmp = value;
    if (!tmp.startsWith('0x')) {
      tmp = `0x${tmp}`;
    }

    fromRpcSig(tmp);
  } catch {
    return <div className="invalid-feedback">Not a valid signature</div>;
  }
};
