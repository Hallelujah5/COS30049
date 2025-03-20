export function validateTransfer(transferData) {
    const errors = []; 

    // Get form inputs from transferData instead of document.getElementById
    const { address_to, amount, keyword, message } = transferData;

    // address
    if (!address_to || address_to.length < 0) {
        errors.push("Invalid Ethereum address.");
    }

    // amount
    const amountValue = parseFloat(amount);
    if (!amount || isNaN(amountValue) || amountValue <= 0) {
        errors.push("Amount must be a valid positive number.");
    }

    // keyword
    if (!keyword || keyword.length > 20) {
        errors.push("Keyword is required and must be less than 20 characters.");
    }

    // message
    if (!message || message.length > 250) {
        errors.push("Message is required and must be less than 250 characters.");
    }

    // Show errors if validation fails
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false; 
    }

    alert("Transfer confirmed!");
    return true;
}
