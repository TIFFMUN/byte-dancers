from brownie import SmartContract, accounts, config
from scripts.helpful_scripts import get_account 
from brownie.network import gas_price
from brownie.network.gas.strategies import LinearScalingStrategy
from web3 import Web3

gas_strategy = LinearScalingStrategy("60 gwei", "70 gwei", 1.1)
gas_price(gas_strategy)

owner = accounts[0]
account1 = accounts[1]
print(f"Owner account: {owner}")
print(f"Second account: {account1}")

transaction_history = []

def deploy_contract():
    contract = SmartContract.deploy({'from': accounts[0]})
    return contract


def add_product(contract, name, price, stock):
    tx = contract.addProduct(name, price, stock, {'from': accounts[0]})
    tx.wait(1)  # Wait for transaction receipt
    print(f"Product added - Name: {name}, Price: {price}, Stock: {stock}")
    transaction_history.append({'type': 'add_product', 'tx': tx, 'name': name, 'price': price, 'stock': stock})


def purchase_product(contract, productId, quantity, from_account):
    try:
        total_amount = contract.products(productId)['price'] * quantity

        # Use the specified account to make the transaction
        tx = contract.purchaseProduct(productId, quantity, {'from': from_account, 'value': total_amount})
        print(tx)  
        tx.wait(1)  # Wait for transaction receipt
        gas_used = tx.gas_used * tx.gas_price
        print(f"Transaction successful. Gas used: {gas_used}")
        transaction_history.append({'type': 'purchase_product', 'tx': tx, 'productId': productId, 'quantity': quantity, 'buyer': from_account, 'total_amount': total_amount})

    except Exception as e:
        print(f"Error purchasing product: {e}")
        return None, None  # Handle error case gracefully


def print_transaction_history():
    print("\nTransaction History:")
    for index, entry in enumerate(transaction_history):
        print(f"Transaction {index + 1}:")
        print(f"  - Hash: {entry['tx'].txid}")
        print(f"  - Type: {entry['type']}")

        if entry['type'] == 'purchase_product':
            print(f"  - Buyer: {entry['buyer']}")
            print(f"  - Product ID: {entry['productId']}")
            print(f"  - Quantity: {entry['quantity']}")
            print(f"  - Total Amount: {entry['total_amount']} Wei")

        print(f"  - Gas Used: {entry['tx'].gas_used}")
        print(f"  - Gas Price: {entry['tx'].gas_price}")
        print(f"  - Status: {'Success' if entry['tx'].status == 1 else 'Failed'}")
        print()


def main():
    # Deploy the contract
    contract = deploy_contract()

    price_in_wei = 1 * 10**18

    initial_balance_account0 = accounts[0].balance() / 1e18
    initial_balance_account1 = accounts[1].balance() / 1e18

    # Add a product
    add_product(contract, "Sample Product", price_in_wei, 100)

    # Purchase a product
    purchase_product(contract, 1, 1, account1)

    # Display account balances before and after transaction
    account0_balance = accounts[0].balance() / 1e18
    account1_balance = accounts[1].balance() / 1e18

    print(f'Initial balance of Account 0: {initial_balance_account0} Ether')
    print(f'Initial balance of Account 1: {initial_balance_account1} Ether')
    print('\n')


    print(f'Account 0 balance: {account0_balance} Ether')
    print(f'Account 1 balance: {account1_balance} Ether')

    # Display transaction history
    print_transaction_history()