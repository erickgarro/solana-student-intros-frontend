import * as borsh from '@project-serum/borsh'

export class StudentIntro {
    name: string;
    message: string;

    constructor(name: string, message: string) {
        this.name = name;
        this.message = message;
    }

   borshInstructionSchema = borsh.struct([
        borsh.u8('variant'),
        borsh.str('name'),
        borsh.str('message'),
    ])

    static borshInstructionSchema = borsh.struct([
        borsh.u8('initialized'),
        borsh.str('name'),
        borsh.str('message'),
    ])

    serialize(): Buffer {
        const buffer = Buffer.alloc(1000)
        this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer)
        return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer))
    }

    static deserialize(buffer?: Buffer): StudentIntro|null {
        if (!buffer) return null;

        try {
            const { name, message } = this.borshInstructionSchema.decode(buffer);
            return new StudentIntro(name, message);
        } catch(e) {
            console.log('Deserialization error:', e)
            return null;
        }
    }
}
