import React from 'react';
import validator from 'validator';
import secp256k1 from 'secp256k1';
import util from 'ethereumjs-utils';

export const isNumber = value => {
  if (value === null || value === undefined || !validator.isNumeric(value)) {
    return (
      <div className="invalid-feedback">
        Not a valid number
      </div>
    );
  }
};

export const isHex = value => {
  let hex = false;
  if (value) {
    if (value.startsWith('0x')) {
      value = value.slice(2) || '0';
    }
    hex = validator.isHexadecimal(value);
  }

  if (!hex) {
    return (
      <div className="invalid-feedback">
        Not a valid hexadecimal data
      </div>
    );
  }
};

export const isPrivateKey = value => {
  let key;
  if (value) {
    if (value.startsWith('0x')) {
      value = value.slice(2) || '0';
    }
    try {
      key = validator.isHexadecimal(value) && secp256k1.privateKeyVerify(Buffer.from(value, 'hex'));
    } catch {
      key = false;
    }
  }

  if (!key) {
    return (
      <div className="invalid-feedback">
        Not a valid private key
      </div>
    );
  }
};

export const isPublicKey = value => {
  let key;
  if (value) {
    if (value.startsWith('0x')) {
      value = value.slice(2) || '0';
    }
    try {
      key = validator.isHexadecimal(value) && secp256k1.publicKeyVerify(Buffer.from(value, 'hex'));
    } catch {
      key = false;
    }
  }

  if (!key) {
    return (
      <div className="invalid-feedback">
        Not a valid public key
      </div>
    );
  }
};

export const isValidSignature = value => {
  try {
    util.fromRpcSig(value);
  } catch (err) {
    return (
      <div className="invalid-feedback">
        {err.message}
      </div>
    );
  }
};
