import { resolveSrv } from 'dns/promises'

try {
  const result = await resolveSrv('_mongodb._tcp.cluster0.gufzqkq.mongodb.net')
  console.log(JSON.stringify(result, null, 2))
} catch (error) {
  console.error(error)
  process.exit(1)
}
