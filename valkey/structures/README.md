# Choisir une structure

1. Nombre de vues d'un produit : **String** avec `INCR` (juste un compteur)
2. Champs d'une session utilisateur : **Hash** (plusieurs champs sous une clé) + `EXPIRE`
3. 20 derniers produits consultés : **List** avec `LPUSH` puis `LTRIM 0 19`
4. Savoir si un utilisateur est connecté : **Set** avec `SISMEMBER`
5. Classer les produits les plus consultés : **Sorted Set** avec `ZINCRBY` (le score = nb de vues)
6. Cache d'une fiche produit : **String** (JSON) avec un TTL, ou **Hash** si on veut lire champ par champ
