export function generateSignatureHtml(data) {
  const { colaborador, links, imagens } = data;

  return `<!-- INICIO ASSINATURA COMFORT DOOR -->
<table width="625" height="164" cellpadding="0" cellspacing="0" border="0" style="width:625px; max-width:625px; height:164px; background-color:#FFFFFF; margin:0; padding:0; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:Arial, Helvetica, sans-serif;">
  <tr style="height:164px;">
    <!-- COLUNA 1: FOTO COM CANTO SUPERIOR ARREDONDADO -->
    <td width="118" align="left" valign="middle" style="width:118px; padding-left:14px; padding-right:12px; vertical-align:middle;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td style="width:102px; height:136px; border-radius:34px 6px 6px 6px; overflow:hidden;">
            <img src="${imagens.fotoUrl || colaborador.fotoUrl}"
                 alt="${colaborador.nome}"
                 width="102"
                 height="136"
                 style="display:block; width:102px; height:136px; border-radius:34px 6px 6px 6px; border:0; outline:none; text-decoration:none; object-fit:cover;" />
          </td>
        </tr>
      </table>
    </td>

    <!-- COLUNA 2: DADOS, LOGO E ÍCONES EM LINHA -->
    <td width="318" align="left" valign="middle" style="width:318px; padding:4px 6px 4px 0px; vertical-align:middle;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; font-family:Arial, Helvetica, sans-serif;">
        <!-- NOME -->
        <tr>
          <td style="font-size:20px; font-weight:bold; color:#58585B; line-height:24px; padding-bottom:1px; font-family:Arial, Helvetica, sans-serif; letter-spacing:-0.2px;">
            ${colaborador.nome}
          </td>
        </tr>

        <!-- CARGO -->
        <tr>
          <td style="font-size:12px; font-weight:bold; color:#FF8300; line-height:16px; padding-bottom:7px; font-family:Arial, Helvetica, sans-serif;">
            ${colaborador.cargo}
          </td>
        </tr>

        <!-- CONTATOS -->
        <tr>
          <td style="font-size:12px; color:#58585B; line-height:17px; font-family:Arial, Helvetica, sans-serif;">
            <span style="color:#58585B;">${colaborador.telefone}</span>
            ${colaborador.email ? `<br><a href="mailto:${colaborador.email}" style="color:#58585B; text-decoration:none;">${colaborador.email}</a>` : ''}
            <br>
            <a href="${links.siteUrl}" target="_blank" rel="noopener noreferrer" style="color:#58585B; text-decoration:none;">
              ${links.siteLabel}
            </a>
          </td>
        </tr>

        <!-- ESPAÇADOR -->
        <tr>
          <td height="10" style="font-size:1px; line-height:10px;">&nbsp;</td>
        </tr>

        <!-- LOGO + ÍCONES EM UMA LINHA HORIZONTAL -->
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr>
                <!-- LOGO COMFORT DOOR -->
                <td align="left" valign="middle" style="vertical-align:middle; padding-right:12px;">
                  <a href="${links.siteUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; display:inline-block;">
                    <img src="${imagens.logoUrl}"
                         alt="Comfort Door"
                         width="123"
                         height="30"
                         style="display:block; width:123px; height:auto; max-height:36px; border:0; outline:none; text-decoration:none;" />
                  </a>
                </td>

                <!-- ÍCONE 1: INSTAGRAM -->
                <td align="left" valign="middle" style="vertical-align:middle; padding-right:6px;">
                  <a href="${links.instagramUrl}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">
                    <img src="${imagens.iconeInstagramUrl}" alt="Instagram" width="25" height="25" style="display:block; width:25px; height:25px; border-radius:50%; border:0;" />
                  </a>
                </td>

                <!-- ÍCONE 2: TIKTOK -->
                <td align="left" valign="middle" style="vertical-align:middle; padding-right:6px;">
                  <a href="${links.tiktokUrl}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">
                    <img src="${imagens.iconeTiktokUrl}" alt="TikTok" width="25" height="25" style="display:block; width:25px; height:25px; border-radius:50%; border:0;" />
                  </a>
                </td>

                <!-- ÍCONE 3: LINKEDIN -->
                <td align="left" valign="middle" style="vertical-align:middle; padding-right:6px;">
                  <a href="${links.linkedinUrl}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">
                    <img src="${imagens.iconeLinkedinUrl}" alt="LinkedIn" width="25" height="25" style="display:block; width:25px; height:25px; border-radius:50%; border:0;" />
                  </a>
                </td>

                <!-- ÍCONE 4: YOUTUBE -->
                <td align="left" valign="middle" style="vertical-align:middle;">
                  <a href="${links.youtubeUrl}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">
                    <img src="${imagens.iconeYoutubeUrl}" alt="YouTube" width="25" height="25" style="display:block; width:25px; height:25px; border-radius:50%; border:0;" />
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>

    <!-- COLUNA 3: BANNER INSTITUCIONAL (173x136px) -->
    <td width="189" align="right" valign="middle" style="width:189px; padding-right:14px; vertical-align:middle;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td style="width:173px; height:136px; border-radius:26px 8px 26px 8px; overflow:hidden;">
            <a href="${links.siteUrl}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">
              <img src="${imagens.bannerUrl}"
                   alt="Comfort Door - Indústria Brasileira"
                   width="173"
                   height="136"
                   style="display:block; width:173px; height:136px; border-radius:26px 8px 26px 8px; border:0; outline:none; text-decoration:none; object-fit:cover;" />
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- FIM ASSINATURA COMFORT DOOR -->`;
}
