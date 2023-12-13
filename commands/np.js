const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('np')
        .setDescription('Mostra informações sobre a música que está sendo tocada!'),
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        if (!queue) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            'A fila está vazia! Por favor adicione alguma música!',
                        )
                        .setColor('e8d5ac'),
                ],
            });
        }
        try {
            await interaction.deferReply();
            const song = queue.currentTrack;
            const bar = queue.node.createProgressBar({
                length: 20,
                queue: false,
            });
            const songInfo = new EmbedBuilder()
                .setTitle(song.title)
                .setURL(song.url)
                .setDescription(bar)
                .setThumbnail(song.thumbnail)
                .setFooter({
                    text: `Pedido por ${song.requestedBy.username}`,
                    iconURL: song.requestedBy.avatarURL(),
                })
                .setTimestamp()
                .setColor('e8d5ac');
            return interaction.followUp({ embeds: [songInfo] });
        } catch (e) {
            return interaction.followUp(`Algo deu errado!\n ${e}`);
        }
    },
};
