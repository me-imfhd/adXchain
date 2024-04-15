use anchor_lang::prelude::*;

declare_id!("FtX5sPSgTzSoefKZaeAqBuaYDUWKREUpiDNxFLsScEH2");

#[program]
mod contract {
    use super::*;
    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        ctx.accounts.user.authority = ctx.accounts.authority.key();
        ctx.accounts.user.last_inventory = 0;
        msg!("User Initialized");

        Ok(())
    }
    pub fn initialize_inventory(ctx: Context<InitializeInventory>, collection_mint: Pubkey) -> Result<()> {
        let user = &mut ctx.accounts.user;
        let inventory = &mut ctx.accounts.inventory;
        inventory.id = user.last_inventory;
        inventory.authority = user.authority;
        inventory.collection_mint = collection_mint;
        inventory.last_ad_nft = 0;
        msg!("Inventory Initialized");
        user.last_inventory = user.last_inventory.checked_add(1).unwrap();
        msg!("User's Last Inventory Index Updated");

        Ok(())
    }
    pub fn initialize_ad_nft(ctx: Context<InitializeAdNFT>, nft_mint: Pubkey) -> Result<()> {
        let inventory = &mut ctx.accounts.inventory;
        let ad_nft = &mut ctx.accounts.ad_nft;

        ad_nft.authority = inventory.authority;
        ad_nft.id = inventory.last_ad_nft;
        ad_nft.nft_mint= nft_mint;
        msg!("Ad NFT Initialized");
        inventory.last_ad_nft = inventory.last_ad_nft.checked_add(1).unwrap();
        msg!("Inventory's Last Ad NFT Index Updated");

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeUser<'info> {
    #[account(
        init, 
        payer = authority, 
        space = 8 + 1 + 32, 
        seeds= [b"user", authority.key().as_ref()],
        bump,
        )
    ]
    pub user: Account<'info, UserAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeInventory<'info> {
    #[account(
        mut,
        has_one = authority,
        seeds = [b"user", authority.key().as_ref()],
        bump
    )]
    pub user: Account<'info, UserAccount>,
    #[account(
        init, 
        payer = authority, 
        space = 8 + 1 + 1 + 32 + 32, 
        seeds= [b"inventory", authority.key().as_ref(), &[user.last_inventory as u8].as_ref()],
        bump,
        )
    ]
    pub inventory: Account<'info, InventoryAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeAdNFT<'info> {
    #[account(
        mut,
        has_one = authority,
        seeds = [b"user", authority.key().as_ref()],
        bump
    )]
    pub user: Account<'info, UserAccount>,
    #[account(
        mut, 
        // has_one = authority, 
        // seeds= [b"inventory", authority.key().as_ref(), &[user.last_inventory as u8].as_ref()],
        // bump,
        )
    ]
    pub inventory: Account<'info, InventoryAccount>,
    #[account(
        init, 
        payer = authority, 
        space =  8 + 1 + 32 + 32, 
        seeds= [b"nft", authority.key().as_ref() , &[inventory.last_ad_nft as u8].as_ref()],
        bump,
        )
    ]
    pub ad_nft: Account<'info, AdNFTAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
#[account]
#[derive(Default)]
pub struct AdNFTAccount {
    pub id: u8,
    pub nft_mint: Pubkey,
    pub authority: Pubkey
}

#[account]
#[derive(Default)]
pub struct InventoryAccount {
    pub id: u8,
    pub last_ad_nft: u8,
    pub collection_mint: Pubkey,
    pub authority: Pubkey,
}

#[account]
#[derive(Default)]
pub struct UserAccount {
    pub last_inventory: u8,
    pub authority: Pubkey,
}