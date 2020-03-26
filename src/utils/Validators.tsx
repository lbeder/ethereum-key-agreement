import React from 'react';
import validator from 'validator';
import secp256k1 from 'secp256k1';
import { fromRpcSig } from 'ethereumjs-util';

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
  let key;
  let tmp = value;
  if (tmp) {
    if (tmp.startsWith('0x')) {
      tmp = tmp.slice(2) || '0';
    }
    try {
      key = validator.isHexadecimal(tmp) && secp256k1.privateKeyVerify(Buffer.from(tmp, 'hex'));
    } catch {
      key = false;
    }
  }

  if (!key) {
    return <div className="invalid-feedback">Not a valid private key</div>;
  }
};

export const isPublicKey = (value: string) => {
  let key;
  let tmp = value;
  if (tmp) {
    if (tmp.startsWith('0x')) {
      tmp = tmp.slice(2) || '0';
    }
    try {
      key = validator.isHexadecimal(tmp) && secp256k1.publicKeyVerify(Buffer.from(tmp, 'hex'));
    } catch {
      key = false;
    }
  }

  if (!key) {
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
