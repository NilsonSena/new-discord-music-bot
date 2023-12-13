const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Inicia novamente a música"),
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
            if (!queue.node.isPaused()) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription("A música já está tocando!")
                            .setColor("e8d5ac"),
                    ],
                });
            }
            queue.node.setPaused(false);
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription("A música voltou!")
                        .setColor("e8d5ac"),
                ],
            });
        } catch (e) {
            return interaction.reply(`Algo deu errado: ${e}`);
        }
    },
};
