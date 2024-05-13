# Weaviate RAG demo

Weaviate è un database di conoscenza vettoriale che permette di effettuare ricerche semantiche su grandi quantità di dati grazie all'uso dell'Intelligenza Artificiale e del machine learning. Questo database è progettato per offrire query veloci, scalabilità e una facile integrazione con modelli AI moderni, rendendolo ideale per applicazioni che richiedono comprensione e analisi semantica dei dati.

Il progetto dimostra l'utilizzo efficace di Weaviate per implementare soluzioni basate su Retriever and Generator (RAG). Il RAG è un framework di ricerca delle informazioni che combina due componenti principali: un "retriever", che recupera documenti rilevanti da un corpus di dati, e un "generator", che produce risposte sintetizzate basate sui documenti recuperati. Questo approccio è particolarmente utile per costruire sistemi di question answering e di elaborazione del linguaggio naturale (NLP) che richiedono una comprensione profonda del contesto.

Nel progetto, viene utilizzata la libreria client JavaScript di Weaviate per interagire con il database Weaviate. Il codice dimostra come configurare e connettersi a Weaviate, come inserire dati nel database e come eseguire complesse query di aggregazione e ricerca semantica. Inoltre, il progetto mostra come integrare il modello RAG con Weaviate per creare un sistema di question answering completo, dove il retriever trova documenti pertinenti memorizzati in Weaviate e il generator produce risposte informative basandosi su quei documenti.

## Crea il file di configurazione con le chiavi OpenAi
```bash
OPENAI_APIKEY="sk-xxxxx"
OPENAI_ORGANIZATION="org-xxxx"
```

## Configurazione del Docker Compose
Il file docker-compose.yml che hai fornito configura il servizio weaviate con alcuni parametri specifici. Vediamo cosa significa ciascuna configurazione:

- Image: Utilizzi l'immagine cr.weaviate.io/semitechnologies/weaviate:1.25.0 che è una versione specifica di Weaviate.
- Ports: Espone le porte 8080 (per HTTP) e 50051 (per gRPC) in modo che il servizio possa essere accessibile sia tramite l'API REST che gRPC.
- Volumes: Configuri un volume Docker per mantenere i dati persistenti su disco. Questo è essenziale per non perdere i dati tra i riavvii del contenitore.
- Env_file: Specifica che il contenitore leggerà le variabili d'ambiente da un file denominato .env. Devi assicurarti che questo file sia presente nella directory da cui esegui Docker Compose e che contenga le variabili d'ambiente necessarie.
- Environment: Configura variabili d'ambiente specifiche come limiti di query, accesso anonimo, il percorso di persistenza dei dati e i moduli abilitati.

## Gestione della Persistenza
Il volume weaviate_data è configurato per mantenere i dati persistenti. Ecco come funziona:

- Volume Driver: Utilizzi il driver local con opzioni specifiche (bind) per montare una cartella del tuo filesystem locale nel contenitore.
- Device: Specifica il percorso locale /Users/lorenzo/dev/vt_weaviate_rag_demo/weaviate_data che sarà usato per mantenere i dati persistenti. Assicurati che questa cartella esista sul tuo dispositivo, o creala se non esiste.

Questo setup assicura che tutti i dati generati da Weaviate, come gli indici vettoriali e le configurazioni del database, siano salvati in questa cartella. In caso di riavvio del contenitore, i dati non saranno persi ma verranno ricaricati da questa directory.

## Avvio del Servizio con Docker Compose
Una volta che hai configurato correttamente il tuo file docker-compose.yml e assicurato che tutte le impostazioni siano corrette, puoi avviare il server Weaviate con il seguente comando:

```bash
docker-compose up -d
```
Questo comando avvierà Weaviate in modalità "detached", che significa che il processo di Docker Compose sarà in background e il terminale sarà libero per altri comandi.


