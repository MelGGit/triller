/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  TweetController,
  TweetControllerInterface,
} from "../TweetController";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tweetId",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "changeValue",
        type: "int256",
      },
    ],
    name: "changeVoteInTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_text",
        type: "string",
      },
    ],
    name: "createTweet",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "ownerAddr",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_managerAddr",
        type: "address",
      },
    ],
    name: "setManagerAddr",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class TweetController__factory {
  static readonly abi = _abi;
  static createInterface(): TweetControllerInterface {
    return new utils.Interface(_abi) as TweetControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TweetController {
    return new Contract(address, _abi, signerOrProvider) as TweetController;
  }
}
