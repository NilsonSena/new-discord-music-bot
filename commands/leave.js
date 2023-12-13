const { useQueue } = require("discord-player");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("Para a música e sai do chat de voz!"),
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        if (!queue) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            "A fila está vazia! Por favor adicione alguma música a fila!"
                        )
                        .setColor("e8d5ac"),
                ],
            });
        }
        queue.delete();
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("Saindo do chat de voz!")
                    .setColor("e8d5ac"),
            ],
        });
    },
};
