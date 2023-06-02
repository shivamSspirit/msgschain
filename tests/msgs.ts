import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Msgs } from "../target/types/msgs";
import { assert } from "chai";
import { SystemProgram,Keypair } from "@solana/web3.js";

describe("msgs", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);
  const program = anchor.workspace.Msgs as Program<Msgs>;
  let _baseAccount;

  it("An account is initialized", async function() {
    const baseAccount  = Keypair.generate();
    const initializeTx = await program.methods.initialize("My first message").accounts({
      baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
    }).signers([baseAccount]).rpc()

    console.log("initialize:", initializeTx);

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Data: ', account.data);
    assert.ok(account.data === "My first message");
    _baseAccount = baseAccount;

  });

  it("Update the account previously created: ", async function() {
    const baseAccount = _baseAccount;

    const updateTx = await program.methods.update("My Second message").accounts({
      baseAccount: baseAccount.publicKey,
    }).rpc();
    console.log("updateTx:", updateTx);

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("Updated data: ", account.data);
    assert.ok(account.data === "My Second message");
    console.log("All account data: ", account);
    console.log("All data: ", account.dataList);
    assert.ok(account.dataList.length === 2);
  });

});
