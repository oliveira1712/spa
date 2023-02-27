import { Button } from "@react-email/button"
import { Container } from "@react-email/container"
import { Head } from "@react-email/head"
import { Heading } from "@react-email/heading"
import { Hr } from "@react-email/hr"
import { Html } from "@react-email/html"
import { Img } from "@react-email/img"
import { Link } from "@react-email/link"
import { Preview } from "@react-email/preview"
import { Section } from "@react-email/section"
import { Text } from "@react-email/text"

const baseUrl = "http://localhost:3000/"

export default function NewsLetterTemplate() {
	return (
		<Html>
			<Head />
			<Preview>SPA - Subscrição NewsLetter</Preview>
			<Section style={main}>
				<Container style={container}>
					<Img src={`https://iili.io/H1L8zDx.png`} width="96" height="43" alt="Logo" />
					<Section>
						<Img
							src="https://icon-library.com/images/newsletter-icon/newsletter-icon-15.jpg"
							width="96"
							height="96"
							alt="NewsLetter"
							style={userImage}
						/>
					</Section>
					<Heading style={heading}>Bem-vindo à SPA</Heading>
					<Text style={paragraph}>
						A nossa newsletter é a melhor forma de manter-se em contacto connosco e ser o primeiro a
						saber sobre novos produtos, eventos e promoções. Ao subscrever, receberá atualizações
						regulares diretamente na sua caixa de entrada.
					</Text>
					<Text style={paragraph}>Não perca esta oportunidade de ficar conectado e informado.</Text>
					<Section style={{ padding: "16px 0 20px" }}>
						<Button pY={19} style={button} href={baseUrl}>
							Começar já
						</Button>
					</Section>
					<Hr style={hr} />
					<Text style={{ ...paragraph, fontWeight: "700" }}>Questões frequentes</Text>
					<Text>
						<Link href={`${baseUrl}#Faqs`} style={link}>
							Quais são os benefícios de usar o software de gestão empresarial da SPA?
						</Link>
					</Text>
					<Text>
						<Link href={`${baseUrl}#Faqs`} style={link}>
							O software da SPA oferece suporte para múltiplos idiomas?
						</Link>
					</Text>
					<Text>
						<Link href={`${baseUrl}#Faqs`} style={link}>
							Quais são os benefícios oferecidos pela SPA comparado a outros softwares?
						</Link>
					</Text>
					<Hr style={hr} />
					<Text style={footer}>SPA, Inc., R. António Sérgio 784, 4460-707 Custóias</Text>
				</Container>
			</Section>
		</Html>
	)
}

const fontFamily =
	'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'

const main = {
	backgroundColor: "#ffffff",
}

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
	width: "580px",
}

const userImage = {
	margin: "0 auto",
	marginBottom: "16px",
	borderRadius: "50%",
}

const heading = {
	fontFamily,
	fontSize: "32px",
	lineHeight: "1.3",
	fontWeight: "700",
	color: "#484848",
}

const paragraph = {
	fontFamily,
	fontSize: "18px",
	lineHeight: "1.4",
	color: "#484848",
}

const button = {
	fontFamily,
	backgroundColor: "#0ea5e9",
	borderRadius: "3px",
	color: "#fff",
	fontSize: "18px",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	width: "100%",
}

const link = {
	...paragraph,
	color: "#0ea5e9",
	display: "block",
}

const hr = {
	borderColor: "#cccccc",
	margin: "20px 0",
}

const footer = {
	fontFamily,
	color: "#9ca299",
	fontSize: "14px",
	marginBottom: "10px",
}
