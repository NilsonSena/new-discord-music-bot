const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("Pula a fila para a posição selecionada")
        .addStringOption((option) =>
            option
                .setName("position")
                .setDescription(
                    "A posição da fila que você deseja selecionar para pular!"
                )
                .setRequired(true)
        ),
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        const desiredPosition =
            Number(interaction.options.getString("position", true)) - 1;
        if (!queue) {
            return await interaction.reply({
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
            // checks if the input is a valid position #
            if (
                desiredPosition < queue.getSize() &&
                desiredPosition >= 0 &&
                desiredPosition !=
                    queue.node.getTrackPosition(queue.currentTrack)
            ) {
                const desiredSong =
                    queue.tracks.toArray()[desiredPosition].title;
                queue.node.skipTo(desiredPosition);
                return await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                `Pulando para a posição **${
                                    desiredPosition + 1
                                }** na fila, **${desiredSong}**!`
                            )
                            .setColor("e8d5ac"),
                    ],
                });
            } else {
                return await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                "Não existe essa posição na fila!"
                            )
                            .setColor("e8d5ac"),
                    ],
                });
            }
        } catch (e) {
            return await interaction.reply(`Algo deu errado!\n ${e}`);
        }
    },
};
