# NoSQL - exercices

Exercices du cours NoSQL, faits à partir du repo [NOSQL-support](https://github.com/mathcovax/NOSQL-support).

Pour lancer un exercice :

```bash
cd mongo/documents/exo1
docker compose up
```

Si besoin de remettre la base à zéro : `docker compose down -v`

## MongoDB

### Documents
- `mongo/documents/exo1` : produits `accessories` avec au moins 20 en stock
- `mongo/documents/exo2` : variante à moins de 1600 € avec du stock (`$elemMatch`)
- `mongo/documents/exo3` : modifier seulement `stock.quantity`

Exo 3 : avec la requête proposée on obtient `stock: { quantity: 8 }`, `reserved` et `warehouse` sont écrasés. Il faut utiliser `"stock.quantity": 8`.

### Index
- `mongo/indexes/exo1` : index sur `categories.id`, `explain()` montre un `IXSCAN`

### Agrégations
- `mongo/aggregations/exo1` : commandes paid depuis le 01/09
- `mongo/aggregations/exo2` : chiffre d'affaires par catégorie
- `mongo/aggregations/exo3` : top 5 produits vendus

### Cluster
- `mongo/cluster` : replica set + change stream (exemple du cours)

## Valkey
- `valkey/structures` : choisir une structure (exercice écrit)
- `valkey/exo1` : Pub/Sub
- `valkey/exo2` : Stream
