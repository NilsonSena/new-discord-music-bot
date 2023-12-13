const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Pula para a próxima música"),
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
            const skippedTrack = queue.currentTrack.title;
            queue.node.skip();
            let endMessage = "";
            if (queue.getSize() == 0) {
                endMessage =
                    "Não existem mais músicas a serem tocadas, saindo do chat de voz!";
            }
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            `Pulando a música **${skippedTrack}**\n${endMessage}`
                        )
                        .setColor("e8d5ac"),
                ],
            });
        } catch (e) {
            return interaction.reply(`Algo deu errado: ${e}`);
        }
    },
};
