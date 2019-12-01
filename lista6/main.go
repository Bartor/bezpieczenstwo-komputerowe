package main

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"os"
)

func decode(key string, byteIv []byte, byteText []byte, output chan string) {
	byteKey, _ := hex.DecodeString(key)

	block, err := aes.NewCipher(byteKey)
	if err != nil {
		panic(err)
	}

	if len(byteText) < aes.BlockSize {
		panic("Cipher text is too short")
	}
	if len(byteText)%aes.BlockSize != 0 {
		panic("Cipher text is not a multiple of the block size")
	}

	mode := cipher.NewCBCDecrypter(block, byteIv)
	mode.CryptBlocks(byteText, byteText)
	output <- fmt.Sprintf("%s -> %s\n", key, string(byteText))
}

func main() {
	keyLength := 64
	keySuffix := "a72ff324efce90c16d5d4bca9335a3cebebc5313fe714a8c47561d7f"
	byteIv, _ := hex.DecodeString("688359f6744abec863dcee24130e3a7a")
	byteText, _ := base64.StdEncoding.DecodeString("aWPT9JVAA8ftk9CMCmRZb4L6fG4VHxmx62Hga4jH/PDG9UCaM1F0X8iKCQM+oN2X")

	results := make(chan string)
	output, _ := os.OpenFile("output", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0777)

	go func() {
		for i := uint64(1); i < (1 << (4 * uint64(keyLength-len(keySuffix)))); i++ {
			wholeKey := fmt.Sprintf("%0*x%s", keyLength-len(keySuffix), i, keySuffix)
			go decode(wholeKey, byteIv, byteText, results)
			if i%500000 == 0 {
				fmt.Printf("%d goroutines launched\n", i)
			}
		}
	}()

	counter := uint64(0)
	for {
		res := <-results
		counter++
		if counter%500000 == 0 {
			fmt.Printf("->%d goroutines finished\n", counter)
		}
		_, _ = output.WriteString(res)
		if counter == (1<<(4*uint64(keyLength-len(keySuffix))))-1 {
			break
		}
	}
	fmt.Println("Finished")
}
