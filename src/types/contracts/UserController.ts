/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface UserControllerInterface extends utils.Interface {
  functions: {
    "createUser(bytes32,bytes32,bytes32,string,string)": FunctionFragment;
    "ownerAddr()": FunctionFragment;
    "setManagerAddr(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createUser"
      | "ownerAddr"
      | "setManagerAddr"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createUser",
    values: [BytesLike, BytesLike, BytesLike, string, string]
  ): string;
  encodeFunctionData(functionFragment: "ownerAddr", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setManagerAddr",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "createUser", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerAddr", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setManagerAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {};
}

export interface UserController extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: UserControllerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createUser(
      _username: BytesLike,
      _firstName: BytesLike,
      _lastName: BytesLike,
      _bio: string,
      _eMail: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ownerAddr(overrides?: CallOverrides): Promise<[string]>;

    setManagerAddr(
      _managerAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  createUser(
    _username: BytesLike,
    _firstName: BytesLike,
    _lastName: BytesLike,
    _bio: string,
    _eMail: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ownerAddr(overrides?: CallOverrides): Promise<string>;

  setManagerAddr(
    _managerAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    _newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createUser(
      _username: BytesLike,
      _firstName: BytesLike,
      _lastName: BytesLike,
      _bio: string,
      _eMail: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ownerAddr(overrides?: CallOverrides): Promise<string>;

    setManagerAddr(
      _managerAddr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      _newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    createUser(
      _username: BytesLike,
      _firstName: BytesLike,
      _lastName: BytesLike,
      _bio: string,
      _eMail: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ownerAddr(overrides?: CallOverrides): Promise<BigNumber>;

    setManagerAddr(
      _managerAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createUser(
      _username: BytesLike,
      _firstName: BytesLike,
      _lastName: BytesLike,
      _bio: string,
      _eMail: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ownerAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setManagerAddr(
      _managerAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
