W celu wykonania sql injection:
- wejść na stronę przelewu
- podmienić parametr $id na końcu na

```
${id}'; <DOWOLNE POLECENIE SQL>; SELECT * FROM public."Transfers" WHERE '1' = '1
```
