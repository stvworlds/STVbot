module.exports = {
    event: 'interactionCreate',
    once: false,
    async execute(interaction, client) {
        if (interaction.isAutocomplete()) {
            const command = client.commands.get(interaction.commandName);
            if (command && command.autocomplete) {
                try {
                    await command.autocomplete(interaction);
                } catch (err) {
                    console.error('Autocomplete error:', err);
                }
            }
            return;
        }
        
        if (!interaction.isChatInputCommand()) return;
            const command = client.commands.get(interaction.commandName);
        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error('Error executing command:', error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
}
}