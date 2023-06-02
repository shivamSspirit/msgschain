use anchor_lang::prelude::*;

declare_id!("7RJGUEhX5k1CfMnC32KAvLUR491idVkD6KHtrkAT4vjX");

#[program]
pub mod msgs {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        data: String,
    ) -> anchor_lang::solana_program::entrypoint::ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);
        Ok(())
    }

    pub fn update(
        ctx: Context<Update>,
        data: String,
    ) -> anchor_lang::solana_program::entrypoint::ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64 + 64)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[account]
pub struct BaseAccount {
    pub data: String,
    pub data_list: Vec<String>,
}
