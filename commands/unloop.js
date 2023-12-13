const { useQueue } = require("discord-player");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unloop")
        .setDescription("Tira a fila de uma repetição"),
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
            queue.setRepeatMode(0);
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription("Foi desfeito a repetição da fila!")
                        .setColor("e8d5ac"),
                ],
            });
        } catch (e) {
            return interaction.reply(`Algo deu errado: ${e}`);
        }
    },
};
