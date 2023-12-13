const { useQueue } = require("discord-player");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Repete a fila"),
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        if (!queue) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            "A fila está vazia! Por favor adicione alguma música!"
                        )
                        .setColor("e8d5ac"),
                ],
            });
        }
        try {
            queue.setRepeatMode(2);
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription("Repetindo a fila")
                        .setColor("e8d5ac"),
                ],
            });
        } catch (e) {
            return interaction.reply(`Algo deu errado: ${e}`);
        }
    },
};
