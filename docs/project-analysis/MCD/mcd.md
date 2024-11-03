# MCD

---

Trois types de relations possible :

1. one-to-one
2. one-to-many
3. many-to-many

Pour faire un MCD, il faut partir de la demande du client, et tenter d'identifier des entités qui vont re présenter les éléments essentiels de notre application, et on doit aussi identifier les attributs qui composent ces entités.

Les nom des entités s'écrivent au singulier et avec la première lettre en majuscule (mais c'est ok si vous écrivez les entités en MAJ)

Les entités possèdent un déterminant / discriminant

On ne parle jamais d'ID dans un MCD

> (Une entité est tout le temps composé d'un "titre" et d'une "description")

Trouver un verbe qui décrit la relation entre deux entités

Quiz est il associé à une autre entité ?

Quiz et Question : true : Un Quiz est composé de plusieurs Question, une Question appartient à un Quiz
Cardinalité : 1N : one-to-many

Quiz et Utilisateur : true : Un Quiz est écrit par un Utilisateur, un Utilisateur peut écrire plusieurs Quiz
Cardinalité : 1N : one-to-many

Quiz et Catégorie : true : Un Quiz Appartenir une ou plusieurs Catégorie, Un Catégorie Comporter un ou plusieurs Quiz

Cardinalité : 0N : many-to-many

Question et Réponse : true one-to-many

Question et Niveau : true one-to-many

```
:
:
valide, 11 question, 01 réponse

niveau: code niveau, libellé
défini, 0N niveau, 11 question
question: code_question, description, anecdote, wiki
possède, 0N question, 11 réponse
réponse: code réponse, description

compose, 11 question, 0N quiz

utilisateur: code utilisateur, email, prénom, nom, mot de passe
créé, 0N utilisateur, 11 quiz
quiz: code quiz, titre, description
appartient, 0N quiz, 0N catégorie
catégorie : code_catégorie, nom
```
