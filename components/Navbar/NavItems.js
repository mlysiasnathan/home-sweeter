'use client';

import dynamic from 'next/dynamic'
import { signIn, signOut, useSession } from "next-auth/react";

import { useRouter } from 'next/router'

const NavItem = dynamic(() => import('./NavItem'))
const Dropdown = dynamic(() => import('./Dropdown'))

import { aboutLinks, shopLinks } from '../../lib/data/navLinks'

const NavItems = ({ sidebar, handleClose }) => {

  const { locale } = useRouter()
  const { data: session } = useSession();

  return (
    <>
      <NavItem 
        linkName={locale == 'fr-FR' ? 'Accueil' : locale == 'ar-DZ' ? 'الرئيسة' : 'Home' } 
        to={'/'}
        locale={locale}
        sidebar={sidebar}
        handleClose={handleClose}
      />
      <NavItem 
        linkName={locale == 'fr-FR' ? 'Boutique' : locale == 'ar-DZ' ? 'المتجر' : 'Shop'}
        withDropDown={true}
        locale={locale}
        sidebar={sidebar}
      >
        <Dropdown links={shopLinks} handleClose={handleClose} sidebar={sidebar} />
      </NavItem> 
      <NavItem 
        linkName={locale == 'fr-FR' ? 'À propos' : locale == 'ar-DZ' ? 'حول' : 'About' }
        withDropDown={true}
        locale={locale}
        sidebar={sidebar}
      >
        <Dropdown links={aboutLinks} sidebar={sidebar} handleClose={handleClose} />
      </NavItem>
      {session ? (
        <NavItem
            linkName={locale == 'fr-FR' ? 'Se deconnecter' :   'LOG OUT' }
            onClick={() => signOut()}
            locale={locale}
            sidebar={sidebar}
            handleClose={handleClose}
        />) : (
        <NavItem
            linkName={locale == 'fr-FR' ? 'Se connecter' :   'LOG IN' }
            onClick={() => signIn("google")}
            locale={locale}
            sidebar={sidebar}
            handleClose={handleClose}
        />)}

    </>
  )
}

export default NavItems