let fetch = require('node-fetch')
let handler = async (m, { text, command, usedPrefix }) => {
    if (!text) throw `contoh:\n${usedPrefix + command} stikerinbot`
    let res = await fetch(global.API('https://api.github.com', '/search/repositories', {
        q: text
    }))
    if (!res.ok) throw eror
    let json = await res.json()
    let str = json.items.map((repo, index) => {
        return `
${1 + index}. *${repo.full_name}*${repo.fork ? ' (fork)' : ''}
${repo.html_url}
Dibuat pada: ${formatDate(repo.created_at)}
Terakhir update pada: ${formatDate(repo.updated_at)}
Watchers: ${repo.watchers}
Forks: ${repo.forks}
Stargazers: ${repo.stargazers_count}
Issues: ${repo.open_issues}
${repo.description ? `
Deskripsi:\n${repo.description}` : ''}
Clone: \`\`\`$ git clone ${repo.clone_url}\`\`\`
`.trim()
    }).join('\n\n')
    m.reply(str)
}
handler.help = ['githubsearch'].map(v => v + ' <pencarian>')
handler.tags = ['tools']

handler.command = /^g(ithub|h)search$/i

module.exports = handler

function formatDate(n, locale = 'id') {
    let d = new Date(n)
    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
}