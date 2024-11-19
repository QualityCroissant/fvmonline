CC=emcc
CFLAGS=-Wall -Wextra -O3

EMFLAGS=-sEXPORTED_RUNTIME_METHODS=ccall --embed-file hardware@hardware --embed-file buffers/asm_buffer.fa@buffers/asm_buffer.fa --embed-file buffers/bin_buffer.fb@buffers/bin_buffer.fb

EMFLAGS_A=-sEXPORTED_FUNCTIONS=_fvma_assemble
EMFLAGS_R=-sEXPORTED_FUNCTIONS=_fvmr_run
EMFLAGS_C=-sEXPORTED_FUNCTIONS=_fvma_assemble,_fvmr_run

SRC_A=src/fvm_assembler.c
BIN_A=fvma.js

SRC_R=src/fvm_runtime.c
BIN_R=fvmr.js

BIN_C=fvm.js

MAKEFLAGS += --silent

fvma:
	echo "Building fvma..."

	${CC} ${CFLAGS} ${SRC_A} ${EMFLAGS_A} ${EMFLAGS} -o ${BIN_A}

	echo "Done building fvma!"

fvmr:
	echo "Building fvmr..."

	${CC} ${CFLAGS} ${SRC_R} ${EMFLAGS_R} ${EMFLAGS} -o ${BIN_R}

	echo "Done building fvmr!"

all:
	echo "Building all..."

	$(MAKE) fvma
	$(MAKE) fvmr

	echo "Done!"

combined:
	echo "Building combined..."

	${CC} ${CFLAGS} ${SRC_A} ${SRC_R} ${EMFLAGS_C} ${EMFLAGS} -o ${BIN_C}

	echo "Done!"
