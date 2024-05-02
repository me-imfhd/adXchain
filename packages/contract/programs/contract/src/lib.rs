use anchor_lang::prelude::*;

declare_id!("ADXZ7eEnK2iU8tAPPvUbAw7NBQokSVhirAiHUFBHLfsj");
#[program]
mod contract {
    use anchor_lang::system_program;

    use super::*;
    pub fn initialize_inventory(
        ctx: Context<InitializeInventory>,
        inventory_id: u64,
        collection_mint: Pubkey
    ) -> Result<()> {
        let inventory = &mut ctx.accounts.inventory;
        let authority = &ctx.accounts.authority;
        inventory.id = inventory_id;
        inventory.authority = authority.key();
        inventory.collection_mint = collection_mint;
        msg!("Inventory Initialized inventory_id: {}", inventory_id);

        Ok(())
    }
    pub fn initialize_ad_nft(
        ctx: Context<InitializeAdNFT>,
        inventory_id: u64,
        nft_id: u64,
        nft_mint: Pubkey,
        price_lamports: u64
    ) -> Result<()> {
        let inventory = &mut ctx.accounts.inventory;
        let ad_nft = &mut ctx.accounts.ad_nft;

        ad_nft.collection_mint = inventory.collection_mint;
        ad_nft.id = nft_id;
        ad_nft.nft_mint = nft_mint;
        ad_nft.lent = false;
        ad_nft.price_lamports = price_lamports;
        ad_nft.current_renter = None;
        msg!("Ad NFT Initialized ad_nft id: {} and inventory_id: {}", nft_id, inventory_id);

        Ok(())
    }
    pub fn update_ad_nft(
        ctx: Context<UpdateAdNFT>,
        inventory_id: u64,
        nft_id: u64,
        nft_mint: Pubkey,
        price_lamports: u64,
    ) -> Result<()> {
        let inventory = &mut ctx.accounts.inventory;
        let ad_nft = &mut ctx.accounts.ad_nft;

        ad_nft.collection_mint = inventory.collection_mint;
        ad_nft.nft_mint = nft_mint;
        ad_nft.price_lamports = price_lamports;
        msg!("Ad NFT Updated ad_nft id: {} and inventory_id: {}", nft_id, inventory_id);
        Ok(())
    }
    pub fn lend_ad_nft(
        ctx: Context<LendAdNFT>,
        inventory_id: u64,
        nft_id: u64,
        amount: u64,
    ) -> Result<()> {
        let ad_nft = &mut ctx.accounts.ad_nft;
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(), 
            system_program::Transfer {
                from: ctx.accounts.signer.to_account_info().clone(),
                to: ctx.accounts.lender.clone(),
            });
        system_program::transfer(cpi_context, amount)?;
        
        ad_nft.lent = true;
        ad_nft.current_renter = Some(ctx.accounts.signer.key());

        msg!("Ad NFT Lent Successfully. nft_id: {} inventory_id: {}", nft_id, inventory_id);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(inventory_id: u64)]
pub struct InitializeInventory<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 32 + 8,
        seeds = [b"inventory", inventory_id.to_le_bytes().as_ref()],
        bump
    )]
    pub inventory: Account<'info, InventoryAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(inventory_id: u64, nft_id: u64)]
pub struct InitializeAdNFT<'info> {
    #[account(
        mut, 
        has_one = authority, 
        seeds= [b"inventory", inventory_id.to_le_bytes().as_ref()],
        bump,
        )]
    pub inventory: Account<'info, InventoryAccount>,
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 1 + 32 + 32 + 8 + 1 + 8,
        seeds = [b"nft", inventory.key().as_ref(), nft_id.to_le_bytes().as_ref()],
        bump
    )]
    pub ad_nft: Account<'info, AdNFTAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(inventory_id: u64, nft_id: u64)]
pub struct UpdateAdNFT<'info> {
    #[account(
        mut, 
        has_one = authority,
        seeds= [b"inventory", inventory_id.to_le_bytes().as_ref()],
        bump,
        )]
    pub inventory: Account<'info, InventoryAccount>,
    #[account(
        mut, 
        seeds= [b"nft", inventory.key().as_ref() , nft_id.to_le_bytes().as_ref()],
        bump,
        )]
    pub ad_nft: Account<'info, AdNFTAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
#[instruction(inventory_id: u64, nft_id: u64)]
pub struct LendAdNFT<'info> {
    #[account(
        mut, 
        seeds= [b"inventory", inventory_id.to_le_bytes().as_ref()],
        bump,
        )]
    pub inventory: Account<'info, InventoryAccount>,
    #[account(
        mut, 
        seeds= [b"nft", inventory.key().as_ref() , nft_id.to_le_bytes().as_ref()],
        bump,
        )]
    pub ad_nft: Account<'info, AdNFTAccount>,
    pub signer: Signer<'info>,
    /// CHECK: Lender's account
    pub lender: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}
#[account]
#[derive(Default)]
pub struct AdNFTAccount {
    pub collection_mint: Pubkey,
    pub current_renter: Option<Pubkey>,
    pub nft_mint: Pubkey,
    pub price_lamports: u64,
    pub lent: bool,
    pub id: u64,
}

#[account]
#[derive(Default)]
pub struct InventoryAccount {
    pub authority: Pubkey,
    pub collection_mint: Pubkey,
    pub id: u64,
}
