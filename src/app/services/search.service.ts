import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Item } from '../interfaces/item';
import { DefaultResponse } from './default-response';
import { Section } from '../interfaces/section';
import { Category } from '../interfaces/category';

// Temporário
const items: Array<Item> = [
  {
    id: 1,
    img: "https://mutec.curitiba.br/wp-content/uploads/2023/11/acervo-105-1.png",
    name: "Calculadora Multo",
    description: `Calculadora Multo, fabricada na Suécia na metade do século passado, produzida de 1936 até 1954, pela Marca Multo. Seu sistema de funcionamento é mecânico, por acionamento manual e, justamente por este motivo, exige um bom grau de compenetração e de entendimento. Ela processa as quatro operações de maneira lógica, quais sejam: A SOMA, é cumulativa e cada algarismo é registrado mecanicamente por um cursor móvel. As parcelas numéricas então são acrescentadas por acionamento de manivela. A SUBTRAÇÃO é análoga à soma, porém invertida, abatendo cada parcela da anterior. A MULTIPLICAÇÃO é mais complexa e baseia-se em seu princípio elementar, realizada por sucessivas adições de parcelas. O cursor inferior é móvel, permitindo acessar cada respectiva casa decimal. Assim ao multiplicar números com vários algarismos, acessa-se os decimais em sequência, assim como antigamente se executava à mão. À esquerda do cursor móvel há indicação do número de vezes que a parcela foi adicionada. A DIVISÂO é ainda mais extravagante, para nós, escravos das eletrônicas. Alicerçada no procedimento elementar do cálculo realizado à mão, é efetivada ao contrário da multiplicação. Assemelha-se ao procedimento que fazíamos com lápis no caderno de aritmética. A máquina possui um providencial “sininho” que soa quando alguma parcela deduzida excede o valor de seu decimal correspondente. Certamente, esta informação verbal é de difícil interpretação, principalmente para quem não mais executa multiplicações e divisões realizadas à mão.`,
    manufacturer: "Addo Multo",
    year: 1936,
    category: {
      id: 1,
      name: "Calculadoras",
      description: "",
      items: [1, 2],
    },
    section: {
      id: 1,
      name: "1",
      description: "",
      items: [1, 2]
    },
  },
  {
    id: 2,
    img: "https://mutec.curitiba.br/wp-content/uploads/2023/09/acervo-59-1.png",
    name: "Calculadora Sperry-Remington 1204GT",
    description: `Calculadora eletrônica com impressão em papel, sem display. Os cálculos são impressos em bobina de papel que tem avanço automático. Capacidade de 12 dígitos, executa adições, subtrações, multiplicações e divisões. Gera resultados positivos e negativos.`,
    manufacturer: "Sperry Rand",
    year: 1973,
    category: {
      id: 1,
      name: "Calculadoras",
      description: "",
      items: [1, 2]
    },
    section: {
      id: 1,
      name: "1",
      description: "",
      items: [1, 2]
    },
  },
  {
    id: 3,
    img: "https://mutec.curitiba.br/wp-content/uploads/2023/11/920-150x150.jpg",
    name: "Computador Analógico",
    description: `Equipamento com circuitos eletrônicos que implementa o modelo de um sistema físico linear e não-linear através da sua equação diferencial, incluindo as condições iniciais e o sinal de entrada. Determina a solução da equação diferencial do sistema através do sinal elétrico de saída. A modelagem de um sistema físico real num computador é denominado de simulação. O computador analógico utilizava tecnologia de válvulas termoiônicas para implementar circuitos somadores, multiplicadores e integradores. O computador analógico é configurado pelo usuário através de cabos interligando os blocos para representar a equação diferencial na forma de equação integral. Os computadores analógicos tornaram-se obsoletos devido aos algoritmos de técnicas discretas de simulação e solução de equações diferenciais nos computadores digitais.`,
    manufacturer: "",
    year: -1,
    category: {
      id: 3,
      name: "Computadores",
      description: "",
      items: [3]
    },
    section: {
      id: 3,
      name: "3",
      description: "",
      items: [3]
    },
  },
  {
    id: 4,
    img: "https://mutec.curitiba.br/wp-content/uploads/2020/01/TU77-01.jpg",
    name: "Unidade de fita TU77",
    description: `A desvantagem da fita em relação ao disco é que a leitura e gravação exigiam desenrolar o carretel até a posição onde a informação estava gravada ou seria gravada, portanto uma operação muito mais demorada do que o acesso em disco.`,
    manufacturer: "Digital Equipment Corporation – DEC",
    year: 1975,
    category: {
      id: 4,
      name: "Dispositivos de armazenamento de dados",
      description: "",
      items: [4]
    },
    section: {
      id: 4,
      name: "4",
      description: "",
      items: [4]
    },
  },
  {
    id: 5,
    img: "https://mutec.curitiba.br/wp-content/uploads/2024/09/img_20240924_111123-150x150.jpg",
    name: "Conjunto de Compassos",
    description: `Conjunto de Compassos.`,
    manufacturer: "",
    year: -1,
    category: {
      id: 2,
      name: "Arquitetura e Desenho Técnico",
      description: "",
      items: [5]
    },
    section: {
      id: 2,
      name: "2",
      description: "",
      items: [5],
    },
  },
];
const sections: Array<Section> = [
  {
    id: 1,
    name: "1",
    description: "",
    items: [1, 2]
  },
  {
    id: 2,
    name: "2",
    description: "",
    items: [5]
  },
  {
    id: 3,
    name: "3",
    description: "",
    items: [3]
  },
  {
    id: 4,
    name: "4",
    description: "",
    items: [4]
  },
];
const categories: Array<Category> = [
  {
    id: 1,
    name: "Calculadoras",
    description: "",
    items: [1, 2],
    img: "https://mutec.curitiba.br/wp-content/uploads/2023/11/acervo-105-1.png"
  },
  {
    id: 2,
    name: "Arquitetura e Desenho Técnico",
    description: "",
    items: [5],
    img: "https://mutec.curitiba.br/wp-content/uploads/2024/09/img_20240924_111123-150x150.jpg"
  },
  {
    id: 3,
    name: "Computadores",
    description: "",
    items: [3],
    img: "https://mutec.curitiba.br/wp-content/uploads/2023/11/920-150x150.jpg"
  },
  {
    id: 4,
    name: "Dispositivos de armazenamento de dados",
    description: "",
    items: [4],
    img: "https://mutec.curitiba.br/wp-content/uploads/2020/01/TU77-01.jpg"
  },
];

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly api: string = "";

  constructor(private http: HttpClient) { }

  public getItems(page?: number, size?: number): Observable<DefaultResponse<Array<Item>>> {
    return of({ status: 200, data: items }).pipe(delay(1000));
  }

  public getItem(id: number): Observable<DefaultResponse<Item>> {
    return of({ status: 200, data: items.find(v => v.id == id) ?? null}).pipe(delay(1000));
  }

  public getSections(page?: number, size?: number): Observable<DefaultResponse<Array<Section>>> {
    return of({ status: 200, data: sections }).pipe(delay(1000));
  }

  public getSection(id: number): Observable<DefaultResponse<Section>> {
    return of({ status: 200, data: sections.find(v => v.id == id) ?? null}).pipe(delay(1000));
  }

  public getCategories(page?: number, size?: number): Observable<DefaultResponse<Array<Category>>> {
    return of({ status: 200, data: categories }).pipe(delay(1000));
  }

  public getCategory(id: number): Observable<DefaultResponse<Category>> {
    return of({ status: 200, data: categories.find(i => i.id == id) ?? null }).pipe(delay(1000));
  }

  public getItemsBySection(id: number, page: number, size: number): Observable<DefaultResponse<Array<Item>>> {
    return of({ status: 200, data: items.filter(i => i.id == id) }).pipe(delay(1000));
  }

  public getItemsByCategory(id: number, page: number, size: number): Observable<DefaultResponse<Array<Item>>> {
    return of({ status: 200, data: items.filter(i => i.id == id) }).pipe(delay(1000));
  }

  public getItemsByName(name: string, page: number, size: number): Observable<DefaultResponse<Array<Item>>> {
    return of({ status: 200, data: items.filter(i => i.name.toLowerCase().includes(name.toLowerCase())) }).pipe(delay(1000));
  }

  public getSectionsByName(name: string, page: number, size: number): Observable<DefaultResponse<Array<Section>>> {
    return of({ status: 200, data: sections.filter(i => i.name.toLowerCase().includes(name.toLowerCase())) }).pipe(delay(1000));
  }

  public getCategoriesByName(name: string, page: number, size: number): Observable<DefaultResponse<Array<Category>>> {
    return of({ status: 200, data: categories.filter(i => i.name.toLowerCase().includes(name.toLowerCase())) }).pipe(delay(1000));
  }
}
